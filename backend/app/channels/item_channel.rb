class ItemChannel < ApplicationCable::Channel
    def subscribed
        stream_from("items")
    end
    def unsubscribed
    end
end