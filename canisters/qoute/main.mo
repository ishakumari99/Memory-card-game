import List "mo:base/List";
import Time "mo:base/Time";
import Map "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Order "mo:base/Order";

actor {

  type QouteId = Nat;

  // Post type is going to represent each post. You can add your own attributes (don't forget to also update create and update methods).
  type Qoute = {
    qoute_text : Text;
    time_created : Time.Time;
    time_updated : Time.Time;
    theme : Text;
    published : Bool;
    like : Bool;
    author : Principal;
    tags : [Text];
  };

  // Custom error types, you can define your own error type for situations that can go wrong.
  // Possible errors for create function
  type CreateQouteError = {
    #UserNotAuthenticated;
    #QouteNotFound;
    #EmptyTitle;
  };

  // Possible errors for get function
  type GetQouteError = {
    #QouteNotFound;
  };

  // Possible errors for update function
  type UpdateQouteError = {
    #UserNotAuthenticated;
    #QouteNotFound;
    #EmptyTitle;
  };

  // Possible errors for delete function
  type DeleteQouteError = {
    #UserNotAuthenticated;
  };

  // Stable variable that will store an index to create new posts in the create function.
  private stable var next : QouteId = 1;

  /* 
    Stable array that will be used to keep posts between updates.
    We need this because HashMap that we use to store posts is not a stable storage.
    */
  private stable var stableqoutes : [(QouteId, Qoute)] = [];

  // Function for equality check
  let eq : (Nat, Nat) -> Bool = func(x, y) { x == y };

  /*
        This is our database. I choose HashMap as it can store a lot of posts and read them individually effectively. 
        HashMap is not a stable storage, that is why we also defined a stable array stableposts and preupgrade and postupgrade functions.
    */
  private var allqoutes = Map.HashMap<QouteId, Qoute>(0, eq, Hash.hash);

  /*
        Create a sample blogpost so developers can see some content on the page when they run the app for the first time.
        Once you connect your wallet and create your own posts, you can remove this code, it becomes unnecessary. 
    */
  let allqoute : Qoute = {
    time_created = Time.now();
    time_updated = Time.now();
    qoute_text = "You have to grow from the inside out. None can teach you; none can make you spiritual. There is no other teacher but your own soul.";
    theme = "red";
    published = true;
    like = true;
    author = Principal.fromText("2vxsx-fae");
    // Anonymous principal
    tags = [""];
  };

  allqoutes.put(0, allqoute);

  // Preupgrade function will store all posts into stable array before update
  system func preupgrade() {
    stableqoutes := Iter.toArray(allqoutes.entries());
  };



  /*
        Create function takes care of post creation. 
        It expects a simplified version of Post type as only some attributes are defined by the user.
        Attributes such as time_upated or author are defined in the backend.
    */
  public shared (msg) func create(qoute : { qoute_text : Text; theme : Text; published : Bool; like : Bool; tags : [Text] }) : async Result.Result<(), CreateQouteError> {
    // Commented for local development, be sure to uncomment this for production use
    // if(Principal.isAnonymous(msg.caller)){ // Only allows signed users to create a posts
    //     return #err(#UserNotAuthenticated); // If the caller is anonymous Principal "2vxsx-fae" then return an error
    // };

    // Title is required in the fron-tend, but we can also check in the backend
    if (qoute.qoute_text == "") { return #err(#EmptyTitle) };

    let qouteId = next;
    next += 1;  // increment the counter so we never try to create a post under the same index

    let allqoute : Qoute = {
      time_created = Time.now(); // Time is assigned on the backend side
      time_updated = Time.now();
      qoute_text = qoute.qoute_text;
      theme = qoute.theme;
      published = qoute.published;
      like = qoute.like;
      author = msg.caller; // Author is assigned on the backend side too
      tags = qoute.tags;
    };

    allqoutes.put(qouteId, allqoute);
    return #ok(()); // Return an OK result
  };

  // Function for reading individuall post. We could return an optional ?Post type, but for unity, lets return also a Result type
  // Unlike for post create, update and delete, we don't need the user to be authenticated for post reading.
  public query func get(id : QouteId) : async Result.Result<Qoute, GetQouteError> {
    let qoute = allqoutes.get(id);
    return Result.fromOption(qoute, #QouteNotFound);
    // If the post is not found, this will return an error as result.
  };


  // Function for deleting a post is simple. We only want the user to be authenticated.
  public shared (msg) func delete(id : QouteId) : async Result.Result<(), DeleteQouteError> {
    // if(Principal.isAnonymous(msg.caller)){
    //     return #err(#UserNotAuthenticated);
    // };
    allqoutes.delete(id);
    return #ok(());
  };

  // Comparison function that takes 2 posts as an argument and decides the order of those posts
  // We sort by the post ID argument, that should give the same order as time_created
  func comp((id1 : QouteId, p1 : Qoute), (id2 : QouteId, p2 : Qoute)) : Order.Order {
    if (id1 > id2) {
      return #less; // we want a descendant sort
    } else if (id1 < id2) {
      return #greater;
    } else {
      return #equal;
    };
  };
 

 
  // Lists all posts. We could check for the msg.caller (if authenticated) for 100 % prevention of anonymous users reading unpublished articles.
  // But this would make the call to take longer so we check authentication in the front-end only as we are not working with sensitive data.
  public query func list_all() : async [(QouteId, Qoute)] {
    return Array.sort(Iter.toArray(allqoutes.entries()), comp);
  };

  // Internal function that returns BOOL for the published attribute.
  func published((id : QouteId, p : Qoute)) : Bool {
    return p.published;
  };

  // Returns only published posts in descending order.
  public query func list_published() : async [(QouteId, Qoute)] {
    return Array.sort(
      Array.filter(Iter.toArray(allqoutes.entries()), published),
      comp,
    );
  };
};