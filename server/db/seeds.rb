# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rails db:seed command (or create!d alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create!(name: 'Luke', movie: movies.first)

require 'dotenv/load'
apiKey = ENV['TOKEN']

######### User #########
user1 = User.create!(username: 'Eric', email: 'eric@eric.com', password: 'password')
# puts user1.save
user2 = User.create!(username: 'Ryan', email: 'ryan@ryan.com', password: 'password')
# puts user2.save
user3 = User.create!(username: 'Azusa', email: 'azusa@azusa.com', password: 'password')
# puts user3.save
user4 = User.create!(username: 'Erik', email: 'erik@erik.com', password: 'password')
# puts user4.save

# # Event.find_or_create!_by(name: 'My Event', user: User.first)
# # Event.find_or_create!_by(name: 'My Event 2', user: User.last)


# ######### Catgory #########    
r_categories = RestClient.get("https://www.eventbriteapi.com/v3/categories/?token=#{apiKey}")



@r_c = JSON.parse(r_categories.body)
@categories = @r_c["categories"]

@categories.each do |category| 
  Category.create!(category_id: category["id"], category_name: category["name"]);
end

# ######### Event #########

# @test = Category.find_by(category_id: "103")
# puts @test["category_name"]

r_events = RestClient.get("https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=toronto&start_date.keyword=next_month&expand=organizer,venue&token=#{apiKey}&expand=organizer,venue")


@r_e = JSON.parse(r_events.body)
@events = @r_e["events"]

# @test =  @events[0]
# puts @test["name"]["text"]
# puts @test["id"]
# puts @test["description"]["text"]
# puts @test["start"]["local"]
# puts @test["end"]["local"]
# puts @test["logo"]["url"]
# puts @test["url"]
# puts @test["venue"]["address"]["city"]
# puts @test["venue"]["address"]["region"]
# puts @test["venue"]["address"]["localized_address_display"]
# puts @test["venue"]["name"]
# puts @test["venue"]["latitude"]
# puts @test["venue"]["longitude"]
# puts @test["is_free"]
# puts @test["category_id"]

# @test = Category.find_by(category_id: @test["category_id"])
# puts @test["category_name"]

# @categories = Category.all


@events.each do |event| 
  category_id = event["category_id"]
  @category = Category.find_by_category_id(category_id)

  if @category 
    Event.create!(
      name: event["name"]["text"], 
      external_event_id: event["id"], 
      like_count: 0, 
      description: event["description"]["text"], 
      start_local: event["start"]["local"], 
      end_local: event["end"]["local"],
      logo_url: event["logo"]["url"],
      event_url: event["url"], 
      city: event["venue"]["address"]["city"], 
      region: event["venue"]["address"]["region"], 
      venue_name: event["venue"]["name"], 
      venue_address: event["venue"]["address"]["localized_address_display"], 
      latitude: event["venue"]["latitude"], 
      longitude: event["venue"]["longitude"], 
      category: @category, 
      is_free: event["is_free"], 
      cost: "30"
    )
  end
end

######### User_event #########
users_event1 = UsersEvent.create!(user: user1, event: Event.first, bookmarked:true, liked: true);
users_event2 = UsersEvent.create!(user: user1, event: Event.second, bookmarked:true, liked: false);
users_event1 = UsersEvent.create!(user: user1, event: Event.first, bookmarked:false, liked: true);
users_event3 = UsersEvent.create!(user: user2, event: Event.first, bookmarked:true, liked: true);


######### Message #########
message1 = Message.create!(event: Event.first, user: user1, content: "I can't wait! Anyone else going??");  
message2 = Message.create!(event: Event.first, user: user2, content: "I'll DEFINITELY be there!"); 
message3 = Message.create!(event: Event.first, user: user3, content: "This looks super funnnnnn!!"); 
message4 = Message.create!(event: Event.first, user: user4, content: "See you guys there!");
message5 = Message.create!(event: Event.first, user: user1, content: "WAHOOOOOOO!!");  
message6 = Message.create!(event: Event.first, user: user3, content: "Yeeeeeeeeey!!"); 

message7 = Message.create!(event: Event.second, user: user3, content: "Is this event good??");  
message8 = Message.create!(event: Event.second, user: user1, content: "Last year's was amazing!"); 
message9 = Message.create!(event: Event.second, user: user3, content: "I should go!"); 
message10 = Message.create!(event: Event.second, user: user2, content: "Let me join!");









