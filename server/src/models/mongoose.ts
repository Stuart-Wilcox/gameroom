import * as mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/boggle', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('Failed to connect to db\n', err);
    return;
  }
  console.log('Connected to db');
});
mongoose.set('useCreateIndex', true);
export default mongoose;
