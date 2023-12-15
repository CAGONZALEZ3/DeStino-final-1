package com.lechugacorp;

import static spark.Spark.*;
import java.util.*;
import org.json.*;

class Pyramids {

    public ArrayList <String> pyramids = new ArrayList<String>();
    public ArrayList <String> pyramidsTotal = new ArrayList<String>();
    public ArrayList <String> pyramidsPath = new ArrayList<String>();

    public void addPyramids (String e){
        pyramids.add(e);
    }

    public void addPyramidsTotal (String e){
        pyramidsTotal.add(e);
    }
    
    public void addPyramidsPath (String e){
        pyramidsPath.add(e);
    }

    public JSONObject get(int id) {
        JSONObject jObject = new JSONObject();
        jObject.put("id", id);
        jObject.put("draw", pyramids.get(id) );
        jObject.put("totalSum", pyramidsTotal.get(id) );
        jObject.put("path", pyramidsPath.get(id) );
        return jObject;
    }

    public JSONArray all(){
        JSONArray jArray = new JSONArray();
        for (int i = 0; i < pyramids.size(); i++) {
            JSONObject jItem = new JSONObject();
            
            jItem.put("id", i);
            jItem.put("draw", pyramids.get(i) );
            jItem.put("totalSum", pyramidsTotal.get(i) );
            jItem.put("path", pyramidsPath.get(i) );
            
            jArray.put(jItem);
        }
        return jArray;
    }

}

public final class App {

    public static void main(String[] args) {

        enableCORS(null, null, null);

        Pyramids pyramids = new Pyramids();
    
        post("/pyramids", (req, res) -> {
            JSONObject jItem = new JSONObject(req.body());
            String pyramid = jItem.getString("pyramid");
            String total = jItem.getString("total");
            String path = jItem.getString("path");
            pyramids.addPyramids(pyramid);
            pyramids.addPyramidsTotal(total);
            pyramids.addPyramidsPath(path);

            //JSONObject jObject = new JSONObject();
            //jObject.put("pyramids", pyramids.all() );
            //return jObject.toString();

            return "{\"Message\": \"" + "Data Save" + "\"}";
        });

        get("/pyramids/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            return pyramids.get(id); // JSon Object
        });

        get("/pyramids", (req, res) -> {
            JSONObject jObject = new JSONObject();
            jObject.put("pyramids", pyramids.all() ); // pyramids.all() -> JSon Array
            return jObject;
        });

    }

    // Enables CORS on requests. This method is an initialization method and should be called once.
    private static void enableCORS(final String origin, final String methods, final String headers) {
        
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

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            //response.header("Access-Control-Request-Method", methods);
            //response.header("Access-Control-Allow-Headers", headers);
            // Note: this may or may not be necessary in your particular application
            //response.type("application/json");
        });

    }

}
