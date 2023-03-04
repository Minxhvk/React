import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: 'testor',
    content: '',
    emotion: 5,
    create_date: new Date().getTime(),
  },
  {
    id: 2,
    author: 'testor2',
    content: '',
    emotion: 2,
    create_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
