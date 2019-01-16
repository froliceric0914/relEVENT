class UsersEventSerializer < ActiveModel::Serializer

  attributes :id, :event, :bookmarked, :liked

end