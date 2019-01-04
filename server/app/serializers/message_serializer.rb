class MessageSerializer < ActiveModel::Serializer

  attributes :id, :content, :user, :created_at

    # def attributes(*args)
    #   object.attributes.symbolize_keys
    # end
end