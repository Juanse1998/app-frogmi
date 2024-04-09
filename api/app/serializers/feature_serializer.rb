class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :external_id, :magnitude, :place, :time, :url, :tsunami, :mag_type, :title, :longitude, :latitude
  has_many :comments
end
