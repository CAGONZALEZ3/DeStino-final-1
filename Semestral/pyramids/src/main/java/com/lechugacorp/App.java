package com.lechugacorp;

import static spark.Spark.*;
import java.util.*;
import org.json.*;

class Pyramids {

    public ArrayList <String> pyramids = new ArrayList<String>();

    public String get(int i) {
        return pyramids.get(i);
    }

    public void add(String e){
        pyramids.add(e);
    }

    public JSONArray all(){
        JSONArray jArray = new JSONArray();
        for (int i = 0; i < pyramids.size(); i++) {
            JSONObject jItem = new JSONObject();
            jItem.put("pyramid", pyramids.get(i) );
            jItem.put("id", i);
            jArray.put(jItem);
        }
        return jArray;
    }

}

public final class App {

    public static void main(String[] args) {

        Pyramids pyramids = new Pyramids();

        enableCors();

        post("/pyramids", (req, res) -> {
            JSONObject jItem = new JSONObject(req.body());
            String item = jItem.getString("pyramid");
            pyramids.add(item);

            JSONObject jObject = new JSONObject();
            jObject.put("pyramids", pyramids.all() );
            
            return jObject.toString();
        });

        get("/pyramids", (req, res) -> {
            JSONObject jObject = new JSONObject();
            jObject.put("pyramids", pyramids.all() );
            return jObject.toString();
        });

    }

    private static void enableCors() {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
    
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
    
            return "OK";
        });
    
        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    }

}
