import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'components/select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	fontFamilyOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setArticleState: (newStatusPage: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const [articleFilterParams, setArticleFilterParams] =
		useState<ArticleStateType>(defaultArticleState);

	const updateArticleState = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setArticleFilterParams((prev) => ({
			...prev,
			[key]: option,
		}));
	};

	const onSubmitInfo = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={handleToggleOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					onSubmit={onSubmitInfo}
					className={styles.form}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={articleFilterParams.fontFamilyOption}
						onChange={(option) => {
							updateArticleState('fontFamilyOption', option);
						}}
					/>

					<RadioGroup
						name='size_button'
						title='Размер шрифта'
						selected={articleFilterParams.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => {
							updateArticleState('fontSizeOption', option);
						}}
					/>

					<Select
						title='Цвет шрифта'
						selected={articleFilterParams.fontColor}
						options={fontColors}
						onChange={(option) => updateArticleState('fontColor', option)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={articleFilterParams.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateArticleState('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						selected={articleFilterParams.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateArticleState('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setArticleFilterParams(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={() => {
								setArticleState(articleFilterParams);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
