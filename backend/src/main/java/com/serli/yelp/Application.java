package com.serli.yelp;

import com.serli.yelp.api.APIEndPoint;
import net.codestory.http.WebServer;

import static com.serli.yelp.utils.EnvUtils.getenv;

public class Application {
    public static void main(String[] args) {
        WebServer webServer = new WebServer();
        webServer.configure(routes -> {
            routes.add(new APIEndPoint());
        });

        String port = getenv("PORT", "8000");

        webServer.start(Integer.valueOf(port));
    }
}