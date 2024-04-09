# app/models/feature.rb
class Feature < ApplicationRecord

  has_many :comments
  
  validates :title, presence: true
  validates :url, presence: true
  validates :mag_type, presence: true
  validates :place, presence: true
  validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  attribute :time, :datetime

  def formatted_time
    time.strftime("%Y-%m-%d %H:%M:%S")
  end
end
