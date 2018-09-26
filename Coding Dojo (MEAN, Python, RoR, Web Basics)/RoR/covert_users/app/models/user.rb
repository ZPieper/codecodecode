class User < ActiveRecord::Base

  has_many :secrets
  has_many :likes, dependent: :destroy
  has_many :secrets_liked, through: :likes, source: :secret

	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  	validates :name, :email, :presence => true
  	validates :email, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  	validates_length_of :name, in: 2..20
	  validates_length_of :email, in: 5..40
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
