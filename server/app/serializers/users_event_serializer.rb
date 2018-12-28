class UsersEventSerializer < ActiveModel::Serializer

  attributes :id, :event, :bookmarked, :liked 

    # def attributes(*args)
    #   object.attributes.symbolize_keys
    # end
end