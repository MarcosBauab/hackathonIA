const mongoose = require("mongoose")

const preferencesSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: [true, "Please add the ID"]
        },
        prompt: {
            type: String,
            required: [true, "Please add the prompt"]
        }
    }
)

module.exports = mongoose.model("Preferences", preferencesSchema)