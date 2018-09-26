class User < ActiveRecord::Base
   	has_many :events, dependent: :destroy
  	has_many :attends, dependent: :destroy
  	has_many :events_attending, through: :attends, source: :event
    has_many :comments, dependent: :destroy

	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  	validates :first_name, :last_name, :city, :state, :email, :presence => true
  	validates :email, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  	validates_length_of :first_name, :last_name, in: 2..20
	  validates_length_of :email, in: 5..40
	  validates_length_of :city, in: 3..30
	  validates_length_of :state, is: 2
	  validates :password, length: { minimum: 8 }, on: :create
  	has_secure_password

  	before_save :downcase_email
  	before_create :downcase_email
  	before_update :downcase_email

  	private
    def downcase_email
      self.email.downcase!
    end
end
