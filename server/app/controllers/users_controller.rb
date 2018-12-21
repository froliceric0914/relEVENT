class UsersController < ApplicationController
 
  def index
    @users = User.all
    render json: @users, :except => [:events]
  end

  def create
    @user = User.new(
      username: params[:username],
      email: params[:email],
      password: params[:password]
    )

    if @user.save
      render :json =>
      {
        :status => 'ok',
        :message => 'User created!',
        :object => @user
      }.to_json
    else
      render :json =>
      {
        :status => 'error',
        :message => @user.errors.full_messages.to_sentence,
        :object => @user
      }.to_json
    end
  #   if user.save
  #     render json: user
  #     # session[:user_id] = user.id
  #   else
  #     head :unprocessable_entity
  #   end
  end
end