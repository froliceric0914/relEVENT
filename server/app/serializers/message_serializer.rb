class MessageSerializer < ActiveModel::Serializer

  attributes :id, :content, :user

    # def attributes(*args)
    #   object.attributes.symbolize_keys
    # end
end