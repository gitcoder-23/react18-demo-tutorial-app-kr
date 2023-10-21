import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const MenuBar = () => {
  return (
    <DropdownButton id="dropdown-item-button" title="Tutorial Menu">
      <Dropdown.Item href="/">Todo App</Dropdown.Item>
      <Dropdown.Item href="/task/newtodo">NewTodo App</Dropdown.Item>
    </DropdownButton>
  );
};

export default MenuBar;
