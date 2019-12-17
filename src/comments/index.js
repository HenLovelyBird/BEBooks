const express = require("express")
const router = express.Router();

const path = require("path")
const commentsJsonPath = path.join(__dirname, "comments.json")
const commentsJsonPath = path.join(__dirname, "comments.json")

const fs = require("fs-extra")
const { check, validationResult} = require("express-validator")
const uuid = require("uuid/v4")

// get/getbyid/post/put/delete
const getBookComments = async ()=>{
    const buffer = await fs.readFile(commentsJsonPath)
    return JSON.parse(buffer.toString())
}
const getComments = async()=>{
    const buffer = await fs.readFile(commentsJsonPath);
    return JSON.parse(buffer.toString())
}

router.get('/',  async (req, res)=>{
    res.send(await getComments())
})

router.get('/:id', async(req, res) => {
    const comments = await getComments()
    const comment = comments.find(c => c.comment_id === req.params.id);
    if (comment)
        res.send(comment)
    else
        res.status(404).send("Not found")
    const buffer = await fs.readFile(commentsJsonPath);
    return JSON.parse(buffer.toString())
});

router.post('/', async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            res.status(400).send(errors)

        const comments = await getComments()
        const idCheck = comments.find(c => c.comment_id === req.body.id) 
        if (idCheck) 
            res.status(500).send("Id should be unique")

        comments.push(
            ...req.body, 
            id = uuid/v4, 
            date = new Date())

        await fs.writeFile(commentsJsonPath, JSON.stringify(comments))
        res.status(201).send("Your comment has been added!")
});

router.put

router.delete ('/', async (req, res) => {
    const comments = await this.getComments()
    const commentsToSave = comments.filter(c => c.id !== req.params.id2)
    if (commentsToSave.length === comments.length)
        res.status(404).send("Comment not found" + req.params.id2)
    else {
        await fs.writeFile(commentsJsonPath, JSON.stringify(commentsToSave))
        res.send("Deleted!")
    }
});

module.exports = router;