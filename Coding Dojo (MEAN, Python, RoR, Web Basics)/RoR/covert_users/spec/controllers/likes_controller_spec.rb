require 'rails_helper'
RSpec.describe LikesController, type: :controller do 
  before do 
    @user = create(:user)
    @secret = create(:secret, user: @user)
    @like = create(:like, secret: @secret, user: @user)
  end
  context "when not logged in " do 
    before do 
      session[:user_id] = nil
    end
    it "cannot create a like" do
      get :like, id: @secret
      expect(response).to redirect_to("/sessions/new")
    end
    it "cannot destroy a like" do
      delete :unlike, id: @secret
      expect(response).to redirect_to("/sessions/new")
    end
  end
  context "when signed in as the wrong user" do
    before do
      session[:user_id] = 8
    end
    it "shouldn't be able to destroy a like" do
      delete :unlike, id: @secret
      expect(response).to redirect_to("/sessions/new")
    end
  end 
end