package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Path("checkout/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Checkout {  //get basket NEED TO UPDATE FOR ADDED table
    @GET
    @Path("get/{UserID}")
    public String GetUser(@PathParam("UserID") Integer UserID) {
        System.out.println("Invoked Users.GetUser() with UserID " + UserID);
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT OrderID FROM Orders WHERE UserID = ?"); //selecting UserID and Name from the table Users where the UserID is x
            ps.setInt(1, UserID);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            int OrderId = 0;
            if (results.next() == true) {
                response.put("OrderID", results.getString(1)); //fetching OrderID
                OrderId = results.getInt(1);

            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }

    @GET
    @Path("getItems/{UserID}")
    public String GetItems(@PathParam("UserID") Integer UserID) {
        System.out.println("Invoked Users.GetUser() with UserID " + UserID);
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT OrderID FROM Orders WHERE UserID = ?"); //selecting UserID and Name from the table Users where the UserID is x
            ps.setInt(1, UserID);
            ResultSet results = ps.executeQuery();
            //JSONObject response = new JSONObject();
            int orderID = 0;
            if (results.next() == true) {
                orderID = results.getInt(1);
                System.out.println(orderID + "OrderID");
            }
            PreparedStatement ps1 = Main.db.prepareStatement("Select  items.name from orders, items, added where orders.orderid = added.orderid and added.ItemID = items.itemId and orders.orderid = ?;"); //selecting UserID and Name from the table Users where the UserID is x
            ps1.setInt(1, orderID);
            ResultSet results1 = ps1.executeQuery();
            System.out.println(results1.getString(1));
            JSONArray response = new JSONArray();

            while (results1.next() == true) {
                System.out.println("userid " + UserID);
                System.out.println("name " + results1.getString(1));
                JSONObject row1 = new JSONObject();
                row1.put("UserId", UserID);
                row1.put("name", results1.getString(1));
                response.add(row1);

            }

            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }


}


