class Api::UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = current_user.includes(:reservations)
        render :show
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password)
    end
end
