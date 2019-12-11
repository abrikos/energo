import React, { useState, useEffect } from 'react';
import { Search } from './icons';
import { Redirect } from 'react-router-dom';

const SearchBar = () => {
	const [showInput, setShowInput] = useState(false);
	const [searchString, setSearchString] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		return setRedirect(false);
	});

	const handleSearch = () => {
		if (showInput && searchString) {
			doSearch();
		}

		setShowInput(!showInput);
	};

	const doSearch = () => {
		setShowInput(false);
		setRedirect(true);
	};

	const onSearch = e => {
		const value = e.target.value;
		setSearchString(value);
	};

	const onKeyDown = e => {
		if (e.key === 'Enter') {
			doSearch();
		}
	};

	if (redirect) {
		return (
			<Redirect
				to={{
					pathname: '/search',
					search: `?s=${searchString}`,
				}}
			/>
		);
	}
	return (
		<div className="search-bar__wrapper">
			{showInput && <input onChange={e => onSearch(e)} onKeyDown={e => onKeyDown(e)} />}
			<Search className="topbar-icon" onClick={handleSearch} />
		</div>
	);
};

export default SearchBar;
