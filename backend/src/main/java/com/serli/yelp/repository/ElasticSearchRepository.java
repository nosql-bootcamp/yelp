package com.serli.yelp.repository;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class ElasticSearchRepository {
    private final RestHighLevelClient client;
    private final static Set<String> SEARCH_RESULT_ATTRIBUTES = new HashSet<>(Arrays.asList("name", "stars", "review_count", "city", "categories", "location", "id"));

    public ElasticSearchRepository() {
        this.client = new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost("localhost", 9200, "http")
                )
        );
    }

    public List<Map<String, Object>> searchBusiness(String search, double lat, double lon, int distance) throws IOException {
        SearchRequest searchRequest = new SearchRequest("yelp");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        MultiMatchQueryBuilder multiMatchBuilder = QueryBuilders.multiMatchQuery(search);
        multiMatchBuilder.field("name");
        multiMatchBuilder.field("categories");

        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(multiMatchBuilder);
        boolQuery.filter(QueryBuilders.geoDistanceQuery("location").point(lat, lon).distance(distance, DistanceUnit.KILOMETERS));

        searchSourceBuilder.query(boolQuery);

        searchRequest.source(searchSourceBuilder);

        SearchResponse response = client.search(searchRequest);

        return StreamSupport.stream(response.getHits().spliterator(), false)
                .map(searchHit -> {
                    Map<String, Object> source = searchHit.getSourceAsMap();
                    source.put("id", searchHit.getId());

                    return source;
                })
                .map(m -> m.entrySet()
                            .stream()
                            .filter(entry -> SEARCH_RESULT_ATTRIBUTES.contains(entry.getKey()))
                            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue))
                )
                .collect(Collectors.toList());
    }
}
