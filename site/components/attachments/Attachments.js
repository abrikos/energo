import React from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFileWord,
	faFilePdf,
	faFileImage,
	faFilePowerpoint,
	faFileExcel,
	faFileArchive,
	faFile,
} from '@fortawesome/fontawesome-free-solid';

import './styles.scss';

// @observer
export default class Attachments extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.items = this.props.attachments;
	}

	render() {
		return (
			<div className="attachments">
				{this.items.map((item, index) => {
					let parsedName = item.filename.split('.');
					let faIcon = faFile;
					const name = parsedName[parsedName.length - 1].toLowerCase();
					const extention = parsedName[1].toLowerCase();

					if (name === 'doc' || name === 'docx') {
						faIcon = faFileWord;
					} else if (extention === 'pdf') {
						faIcon = faFilePdf;
					} else if (extention === 'jpg' || extention === 'jpeg' || extention === 'png') {
						faIcon = faFileImage;
					} else if (extention === 'ppt' || extention === 'pptx') {
						faIcon = faFilePowerpoint;
					} else if (extention === 'xls' || extention === 'xlsx') {
						faIcon = faFileExcel;
					} else if (extention === 'rar' || extention === 'zip') {
						faIcon = faFileArchive;
					}

					const icon = <FontAwesomeIcon size="2x" icon={faIcon} />;

					return (
						<div className="attachment-item" key={`attachment-${item.id}`}>
							<a
								href={item.filename && item.downloadFile('filename')}
								download
								className="attachment"
							>
								<div className="attachment-icon">{icon}</div>

								<div className="attachment-name">{parsedName[0]}</div>
							</a>
						</div>
					);
				})}
			</div>
		);
	}
}
