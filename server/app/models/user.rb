class User < ApplicationRecord
  has_secure_password
  has_many :users_events
  has_many :events, through: :users_events

  # validates :username, presence: true,  uniqueness: true 
  # validates :email, presence: true, uniqueness: { case_sensitive: false }
  # validates :password, length: { minimum: 7 }, confirmation: true

  def self.authenticate_with_credentials(email, password)
      user = User.find_by_email(email.strip) 
      puts "user"
      puts user
      puts "&&&&&&"
      if user && user.authenticate(password.strip)
        user
      else
        nil
      end
  end 

end
