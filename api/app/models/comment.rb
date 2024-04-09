class Comment < ApplicationRecord
  belongs_to :feature
  attribute :body, :string
end
