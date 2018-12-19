class UsersEvent < ApplicationRecord
  belongs_to :event
  belongs_to :user
end


# <form onSubmit={this.onSubmit}>
#   <input value={this.state.name} onChange={(e) => this.setState(name: e.target.value)}
# </form>

# onSubmit = () => {
#   fetch('localhost:3001/events', {
#     method: "POST",
#     body: JSON.strinifgy{
#       name: this.state.name,
#       .....
#     })
#   })
#   .then(res => res.json())
#   .then(event => {
#     // TODO: Render something else
#   })
# }