class UserSerializer < ActiveModel::Serializer

  attributes :username, :id, :email, :password_digest, :users_event

  has_many :events

end