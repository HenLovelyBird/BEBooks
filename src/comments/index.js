const express = require("express")

const path = require("path")
const commentsJsonPath = path.join(__dirname, "comments.json")

const fs = require("fs-extra")
const { check, validationResult} = require("express-validator")
const uuid = require("uuid/v4")


const getComments = async()=>{
    const buffer = await fs.readFile(commentsJsonPath);
    return JSON.parse(buffer.toString())
}

const router = express.Router();

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


router.post('/', 
[check("asin").exists().withMessage("asin required"),
check("user_name").exists().withMessage("user_name is required"),
check("text").isLength({min:2}).withMessage("Comment is required")], 
async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            res.status(400).send(errors)

        const comments = await getComments()
        // const idCheck = comments.find(c => c.comment_id === req.body.id) 
        // if (idCheck) 
        //     res.status(500).send("id should be unique")

        const comment = {
            ...req.body,
            comment_id: uuid(), 
            date: new Date()
        }
        comments.push(comment)

        await fs.writeFile(commentsJsonPath, JSON.stringify(comments))
        res.status(201).send("Your comment has been added!")
});


router.put ('/:id', async (req, res) => {
    const comments = await getComments()
    const comment = comments.find(c => c.comment_id === req.params.id);
    if (comment){
        const position = comments.indexOf(comment);
        const updateComment = Object.assign(comment, req.body)
        comments[position] = updateComment;
        await fs.writeFile(commentsJsonPath, JSON.stringify(comments))
        res.status(200).send("Updated")
    } 
    else 
        res.status(404).send("Comment Not Found")
})


router.delete ('/:id', async (req, res) => {
    const comments = await this.getComments()
    const commentsToSave = comments.filter(c => c.comment_id !== req.params.id)
    if (commentsToSave.length === comments.length)
        res.status(404).send("Comment not found" + req.params.id)
    else {
        await fs.writeFile(commentsJsonPath, JSON.stringify(commentsToSave))
        res.send("Deleted!")
    }
});

module.exports = router;