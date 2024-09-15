import { useEffect } from 'react';

type TUseClickOut = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClickOut({ isOpen, onClose, rootRef }: TUseClickOut) {
	useEffect(() => {
		if (!isOpen) return;

		function handleClickOut(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}
		document.addEventListener('mousedown', handleClickOut);

		return () => {
			document.removeEventListener('mousedown', handleClickOut);
		};
	}, [isOpen, onClose, rootRef]);
}
