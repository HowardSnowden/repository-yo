class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.string :version
      t.text :description
      t.string :by
      t.string :document

      t.timestamps
    end
  end
end
