class EventSerializer < ActiveModel::Serializer
  # attributes :name, :id, 
  # def attributes
  #   object.attributes.symbolize_keys
  # end
    def attributes(*args)
      object.attributes.symbolize_keys
    end
end