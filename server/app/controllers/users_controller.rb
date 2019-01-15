class UsersController < ApplicationController

  def index
    puts 'INDEX'
    @users = User.all
    render json: @users, :except => [:events]
  end

  def create
    puts user_params
    @user = User.new(user_params)
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
        :status => 'User cannot be created',
        :message => @user.errors.full_messages.to_sentence,
        :object => @user
      }.to_json
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :email, :password)
  end

end
