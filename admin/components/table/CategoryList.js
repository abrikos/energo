import React from 'react';
import { Table, Column } from '@smartplatform/ui';

const CategoryList = ({ records }) => (
	<Table records={records} rootPath="/admin">
		<Column property="category" label="Название категории" />
		<Column property="hide" label="Скрыто" />
	</Table>
);

export default CategoryList;
