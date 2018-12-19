# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_18_213501) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "category_id"
    t.string "category_name"
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.string "external_event_id"
    t.integer "like_count"
    t.string "description"
    t.datetime "start_local"
    t.datetime "end_local"
    t.string "logo_url"
    t.string "event_url"
    t.string "city"
    t.string "region"
    t.string "venue_address"
    t.string "latitude"
    t.string "longitude"
    t.boolean "is_free"
    t.string "cost"
    t.bigint "category_id"
    t.string "venue_name"
    t.index ["category_id"], name: "index_events_on_category_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "message_id"
    t.bigint "user_id"
    t.bigint "event_id"
    t.string "content"
    t.boolean "liked", default: false
    t.boolean "disliked", default: false
    t.index ["event_id"], name: "index_messages_on_event_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.string "location"
    t.string "color"
    t.string "avatar"
  end

  create_table "users_events", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "event_id"
    t.boolean "bookmarked", default: false
    t.boolean "liked", default: false
    t.index ["event_id"], name: "index_users_events_on_event_id"
    t.index ["user_id"], name: "index_users_events_on_user_id"
  end

  add_foreign_key "events", "categories"
end
