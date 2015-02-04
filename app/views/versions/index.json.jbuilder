json.array!(@versions) do |version|
  json.extract! version, :id, :version, :description, :by, :document
  json.url version_url(version, format: :json)
end
