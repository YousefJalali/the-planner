import styled from 'styled-components'

const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__tab-loop {
    position: relative;

    .react-datepicker-popper {
      .react-datepicker {
        font-family: inherit;
        font-size: ${({ theme }) => theme.fontSizes[1]}px;
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.contrast};
        border: 0;
        box-shadow: 0 0 16px 1px rgba(1, 1, 1, 0.1);
        display: inline-block;
        position: relative;
        border-radius: 20px;

        .react-datepicker__triangle {
          visibility: hidden;
        }

        .react-datepicker__navigation {
          /* line-height: 0;
          top: 16px;
          z-index: 1;
          height: 0.944rem;
          width: 0.944rem;
          overflow: hidden;
          outline: none; */
        }
        .react-datepicker__navigation--previous {
          /* left: 20px; */
          border-right-color: ${(props) => props.theme.contrast};
        }
        .react-datepicker__navigation--next {
          /* right: 20px; */
          border-left-color: ${(props) => props.theme.contrast};
        }

        .react-datepicker__month-container {
          .react-datepicker__header {
            text-align: center;
            background-color: ${(props) => props.theme.background};
            padding: 16px 16px 4px 16px;
            position: relative;
            border: 0;
            border-radius: 20px;

            .react-datepicker__current-month {
              margin: 0;
              color: ${(props) => props.theme.contrast};
              font-weight: 900;
              font-size: 0.944rem;
              text-transform: uppercase;
              margin: 0 0 16px 0;
            }

            .react-datepicker__day-names {
              .react-datepicker__day-name {
                color: ${(props) => props.theme.subtle};
                display: inline-block;
                width: 1.7rem;
                line-height: 1.7rem;
                text-align: center;
                margin: 0 4px;
              }
            }
          }

          .react-datepicker__month {
            padding: 4px 16px 16px 16px;
            margin: 0;
            text-align: center;
            background-color: ${(props) => props.theme.background};
            border-radius: 20px;

            .react-datepicker__week {
              .react-datepicker__day,
              .react-datepicker__day--keyboard-selected,
              .react-datepicker__day--keyboard-selected,
              .react-datepicker__month-text--keyboard-selected,
              .react-datepicker__quarter-text--keyboard-selected,
              .react-datepicker__year-text--keyboard-selected {
                color: ${(props) => props.theme.contrast};
                display: inline-block;
                width: 1.7rem;
                line-height: 1.7rem;
                text-align: center;
                margin: 0 4px;
                background-color: ${(props) => props.theme.background};
                outline: none;
              }
              .react-datepicker__day--outside-month {
                color: ${(props) => props.theme.nonessential};
              }

              .react-datepicker__day--selected {
                background-color: ${(props) => props.theme.primary};
                color: #fff;
              }

              .react-datepicker__day--today {
                border: 1px solid ${(props) => props.theme.contrast};
                border-radius: 0.3rem;
              }
            }
          }
        }
      }
    }
  }
`

export default DatePickerWrapper
