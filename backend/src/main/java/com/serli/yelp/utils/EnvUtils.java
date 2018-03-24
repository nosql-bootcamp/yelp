package com.serli.yelp.utils;

public final class EnvUtils {
    private EnvUtils(){}

    public static String getenv(String name, String defaultValue){
        return System.getenv(name) != null ? System.getenv(name) : defaultValue;
    }
}
