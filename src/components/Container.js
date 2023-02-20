export const Container = ({ children }) => {
  return (
    <section className='flex-auto'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 mb-6'>
        {children}
      </div>
    </section>
  );
};
