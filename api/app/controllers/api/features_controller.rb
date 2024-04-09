class Api::FeaturesController < ApplicationController
  before_action :set_feature, only: [:create_comment]

  def index
    if Feature.all.empty?
      fetch_and_render_features_data
    else
      render_existing_features
    end
  end

  # Método para crear un comentario
  def create_comment
    comment = @feature.comments.build(body: comment_params[:body])
    if comment.save
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  # Método para configurar el feature asociado al comentario
  def set_feature
    @feature = Feature.find(params[:feature_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Feature not found" }, status: :not_found
  end

  # Método para permitir los parámetros del comentario
  def comment_params
    params.require(:comment).permit(:body)
  end
 
  # Método para retornar los datos del get
  def render_existing_features
    page = params[:page] || 1
    per_page = params[:per_page] || 10
    if params[:mag_type].present?
      features = Feature.includes(:comments).where(mag_type: params[:mag_type]).paginate(page: page, per_page: per_page)
    else
      features = Feature.includes(:comments).paginate(page: page, per_page: per_page)
    end
    total_pages = features.total_pages
    render json: features, each_serializer: FeatureSerializer, meta: { total_pages: total_pages }, status: :ok
  end
  
  
  # Método para buscar los datos de los terremotos
  def fetch_and_render_features_data
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    response = HTTParty.get(url)
    if response.code == 200
      data = JSON.parse(response.body)
      create_features(data["features"])
      render json: { message: "Datos cargados correctamente" }
    else
      render json: { error: "fallo la carga de datos: #{response.code} - #{response.message}" }, status: :unprocessable_entity
    end
  end

  # Método para guardar los datos dentro de la base de datos
  def create_features(features)
    features.each do |feature_data|
      properties = feature_data["properties"]
      geometry = feature_data["geometry"]
      next unless valid_feature?(properties)
      Feature.create!(
        external_id: properties["id"],
        magnitude: properties["mag"],
        place: properties["place"],
        time: Time.at(properties["time"] / 1000),
        url: properties["url"],
        tsunami: properties["tsunami"],
        mag_type: properties["magType"],
        title: properties["title"],
        longitude: geometry["coordinates"][0],
        latitude: geometry["coordinates"][1]
      )
    end
  end

  def valid_feature?(properties)
      return false unless properties["url"].present?
      return false unless properties["title"].present?
      return false unless properties["magType"].present?
      return false unless properties["place"].present?
    
      magnitude = properties["magnitude"].to_f
      return false unless magnitude >= -1.0 && magnitude <= 10.0
    
      return true
  end
end