# Configuración de la api

1. Crea una base de datos llamada app-frogmi en tu sistema de gestión de bases de datos (por ejemplo, PostgreSQL o MySQL).
2. Remplazar los valores del archivo database.yml con los valores de tu database, el archivo se encuentra en config/database.yml
3. Ejecuta el siguiente comando:
   ```
   bundle install
   ```
4. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```
    rails generate migration createComment
    rails generate migration createFeature
   ```
5. Agrega los siguientes atributos a la migración createComment:
   ```
   t.string :body
   t.references :feature, null: false, foreign_key: true
   ```
6. Agrega los siguientes atributos a la migración createFeature:
   ```
    t.string :title
    t.string :url
    t.string :mag_type
    t.string :place
    t.float :magnitude
    t.float :latitude
    t.float :longitude
    t.boolean :tsunami
    t.string :external_id
    t.datetime :time
   ````
7. Ejecuta las migraciones para aplicar los cambios en la base de datos:
  ```
  rails db:migrate
  ```
8. Para correr el servidor ejecutar el siguiente comando:
   ```
    rails server
   ```





