import * as C from "./App.styles";
import { Category } from "./types/Category";
import { Item } from "./types/Item";
import { Categories } from "./data/Categories";
import { items } from "./data/items";
import { useEffect, useState } from "react";
import { getCurrentMonth, filterListByMonth } from "./helpers/DateFilter";
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";

const App = () => {
  const onMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const [list, setList] = useState(items);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    for (let i in filteredList) {
      if (Categories[filteredList[i].category].expense) {
        expense += filteredList[i].value;
      } else {
        income += filteredList[i].value;
      }
    }

    setIncome(income);
    setExpense(expense);
  }, [filteredList]);

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          onMonthChange={onMonthChange}
          currentMonth={currentMonth}
          income={income}
          expense={expense}
        />
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
};

export default App;
