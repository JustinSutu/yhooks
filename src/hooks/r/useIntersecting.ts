import {RefObject, useEffect, useState} from 'react';

export const useIntersecting = (
	ref: RefObject<any>,
	margin = '0px',
	callback: () => {},
	destroyCallback: () => {},
) => {
	const [isIntersecting, setIntersecting] = useState<boolean>(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting);
		}, {
			rootMargin: margin,
		});

		if (ref.current) {
			observer.observe(ref.current);

			callback();
		}

		return () => {
			observer.unobserve(ref.current);

			destroyCallback();
		};
	}, []);

	return isIntersecting;
}