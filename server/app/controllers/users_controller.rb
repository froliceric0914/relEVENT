class UsersController < ApplicationController
  def index
    puts 'INDEX'
    @users = User.all
    render json: @users, :except => [:events]
  end




  def create
    user = User.new(
      username: params[:username],
      email: params[:email],
      password: params[:password]
    )

    if user.save
      render json: user
      # session[:user_id] = user.id
    else
      head :unprocessable_entity
    end
  end
end
