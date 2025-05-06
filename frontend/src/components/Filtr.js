import React, { useState, useEffect } from "react";

function Filtr({valueType,onChangeType,onChangeComplexity,valueComplexity}) {


  return (
    <div className="dropdown">
    <div className="filter-group">
        <label htmlFor="type-filter">Фільтр за типом</label>
        <select id="type-filter" value={valueType} onChange={(e) => onChangeType(e.target.value)}>
            <option value="all">Всі типи</option>
            <option value="research">Дослідницькі</option>
            <option value="rescue">Рятувальні</option>
            <option value="colonization">Колонізація</option>
        </select>
        <button className="reset-button" onClick={() => onChangeType("all")}>✖</button>
    </div>

    <div className="filter-group">
        <label htmlFor="complexity-filter">Фільтр за складністю</label>
        <select id="complexity-filter" value={valueComplexity} onChange={(e) => onChangeComplexity(e.target.value)}>
            <option value="all">Всі типи</option>
            <option value="easy">Легкі</option>
            <option value="medium">Середні</option>
            <option value="hard">Важкі</option>
        </select>
        <button className="reset-button" onClick={() => onChangeComplexity("all")}>✖</button>
    </div>
</div>
  )
}

export default Filtr;