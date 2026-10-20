# CodeCamp Backend

This project is for the tutorial for intro to backend.

## Configuration

Create a `.env` file in the project root before starting the server:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
PORT=8000
```

The MongoDB connection variable must be named `MONGODB_URI` and must start with
`mongodb://` or `mongodb+srv://`.

Start the server with:

```bash
npm start
```
