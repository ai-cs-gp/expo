export const shadow = (elevation: number) => ({
  // elevation,
  // zIndex: elevation,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0.5 * elevation },
  shadowOpacity: 0.1,
  shadowRadius: 0.5 * elevation,
});
