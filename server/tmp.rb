@events.each do |event| 

  event1 = Event.create!(name: event["name"]["text"], external_event_id: event["id"], like_count: 0, description: event["description"]["text"], start_local: event["start"]["local"], end_local: event["end"]["local"] ,logo_url: event["logo"]["url"],event_url: event["url"], city: event["venue"]["address"]["city"], region: event["venue"]["address"]["region"], venue_name: event["venue"]["name"], venue_address: event["venue"]["address"]["localized_address_display"], latitude: event["venue"]["latitude"], longitude: event["venue"]["longitude"], category_id: "103", is_free: event["is_free"], cost: "30");

  #since I couldn't assign id directory
  # category = event["category_id"]
  # event1.update_column(:category_id, category)
  # puts event1[:category_id]
end

# # ######### 4 User_event #########
# users_event1 = UsersEvent.create!(user: user1, event: Event.first, bookmarked:true, liked: true);
# users_event2 = UsersEvent.create!(user: user1, event: Event.second, bookmarked:false, liked: true);
# users_event3 = UsersEvent.create!(user: user1, event: Event.third, bookmarked:true, liked: false);
# users_event4 = UsersEvent.create!(user: user2, event: Event.first, bookmarked:true, liked: true);
# users_event5 = UsersEvent.create!(user: user2, event: Event.second, bookmarked:true, liked: true);

# # ######### 5 Message #########
# message1 = Message.create!(event: Event.first, user: user1, content: "I can't wait! Anyone else going??");  
# message2 = Message.create!(event: Event.first, user: user2, content: "I'll DEFINITELY be there!"); 
# message3 = Message.create!(event: Event.first, user: user3, content: "This looks super funnnnnn!!"); 
# message4 = Message.create!(event: Event.first, user: user4, content: "See you guys there!");
# message5 = Message.create!(event: Event.first, user: user1, content: "WAHOOOOOOO!!");  
# message6 = Message.create!(event: Event.first, user: user3, content: "Yeeeeeeeeey!!"); 

# message7 = Message.create!(event: Event.second, user: user3, content: "Is this event good??");  
# message8 = Message.create!(event: Event.second, user: user1, content: "Last year's was amazing!"); 
# message9 = Message.create!(event: Event.second, user: user3, content: "I should go!"); 
# message10 = Message.create!(event: Event.second, user: user2, content: "Let me join!");
