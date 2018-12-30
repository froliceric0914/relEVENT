class EventSerializer < ActiveModel::Serializer
  attributes :name, :id, :external_event_id, :description, :like_count 

  
  def like_count
    UsersEvent.where(:event_id => object.id, :liked => "true").count
  end
  
  # def attributes
  #   object.attributes.symbolize_keys
  # end
    # def attributes(*args)
    #   object.attributes.symbolize_keys
    # end
end