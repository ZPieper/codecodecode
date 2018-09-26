class Event < ActiveRecord::Base
  belongs_to :user, required: true

  has_many :attends, dependent: :destroy
  has_many :attendees, through: :attends, source: :user
  has_many :comments, dependent: :destroy

  validates :name, :date, :city, :state, :presence => true
  validates :name, uniqueness: { case_sensitive: false }
  validates_length_of :name, in: 4..40
  validates_length_of :city, in: 3..30
  validates_length_of :state, is: 2
  validate :date_in_future?

  private

  def date_in_future?
  	errors.add(:date, "must be in the future") unless date.future? 
  end
end
