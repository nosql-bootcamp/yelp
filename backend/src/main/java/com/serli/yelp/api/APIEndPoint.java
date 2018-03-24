package com.serli.yelp.api;

import com.serli.yelp.repository.ElasticSearchRepository;
import net.codestory.http.annotations.Get;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class APIEndPoint {
    private final ElasticSearchRepository elasticSearchRepository;

    public APIEndPoint() {
        elasticSearchRepository = new ElasticSearchRepository();
    }

    @Get("business?q=:searchQuery&lat=:lat&lon=:lon&distance=:distance")
    public List<Map<String, Object>> searchBusiness(String searchQuery, double lat, double lon, int distance) throws IOException {
        return elasticSearchRepository.searchBusiness(searchQuery, lat, lon, distance);
    }

    @Get("business/:id/recomandations")
    public List<String> suggestBusiness(String businessId) {
        return Collections.emptyList();
    }
}
